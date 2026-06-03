OUT ?= build/site
MODE ?= online

STATIC := $(wildcard static/*)
SHARED := $(wildcard shared/*)
ONLINE := $(wildcard online/*.js)
OFFLINE := $(wildcard offline/*.js)

.PHONY: all
all: online/index.html offline/index.html

%/index.html: make/%.html
	sed 's/{PREFIX}/..\//;s/{SRC}//' "$<" > "$@"

# Force a rule to always run
.PHONY: _always
_always:

# Detect changes to the mode (online -> offline or vice-versa)
build/mode: _always
	@mkdir -p "$(@D)"
	@tmp=$$(mktemp); echo "${MODE}" > "$$tmp"; \
	if ! cmp --silent "$$tmp" "$@"; then \
		 echo "${MODE}" > "$@"; \
	fi

${OUT}/index.html: make/${MODE}.html build/mode
	@mkdir -p "$(@D)"
	sed "s/{PREFIX}//;s/{SRC}/${MODE}\//" "$<" > "$@"

${OUT}/%: %
	@mkdir -p "$(@D)"
	cp --recursive --reflink=auto "$^" "$@"

.PHONY: install
install: ${OUT}/index.html install-${MODE} install-static install-shared

.PHONY: install-online
install-online: $(addprefix ${OUT}/,$(ONLINE))

.PHONY: install-offline
install-offline: $(addprefix ${OUT}/,$(OFFLINE))

.PHONY: install-static
install-static: $(addprefix ${OUT}/,$(STATIC))

.PHONY: install-shared
install-shared: $(addprefix ${OUT}/,$(SHARED))

.PHONY: clean
clean:
	$(RM) index.html
	$(RM) -r build
