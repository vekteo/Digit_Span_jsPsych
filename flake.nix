{
  inputs.nixpkgs.url = "https://channels.nixos.org/nixos-25.11/nixexprs.tar.xz";

  outputs =
    inputs:
    let
      pkgs = inputs.nixpkgs.legacyPackages.x86_64-linux;
    in
    {
      packages.x86_64-linux.default = pkgs.stdenvNoCC.mkDerivation {
        name = "azize-experiment";

        src = ./.;

        installPhase = ''
          runHook preInstall

          make install OUT="$out"

          runHook postInstall
        '';
      };
    };
}
