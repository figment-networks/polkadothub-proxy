#!/usr/bin/env sh

set -ex

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

export VENDOR_DIR="$SCRIPT_DIR/vendor/"
export TARGET="$VENDOR_DIR/polkadot-calc"
export TMPDIR="$SCRIPT_DIR/tmp/build-polkadot-calc"
export VERSION=0.14.0

rm -rf "$TMPDIR" 
rm -rf "$TARGET"

mkdir -p "$TMPDIR"
mkdir -p "$VENDOR_DIR"
(
    cd "$TMPDIR"
    wget "https://github.com/paritytech/substrate-api-sidecar/archive/v${VERSION}.tar.gz"
    tar xf "v${VERSION}.tar.gz"
    "substrate-api-sidecar-${VERSION}/calc/build.sh"
    mv "substrate-api-sidecar-${VERSION}/calc/pkg" "$TARGET"
)

npm install --save "$TARGET"
