var userVars = {
    private_key: undefined,
    public_key: undefined,
}

function cantainsPrivateKey() {
    if (userVars.private_key === undefined) {
        return false;
    }

    return true;
}

function setUserVars(private_key) {
    userVars.private_key = private_key;
    // userVars.public_key = public_key;
}

export {
    cantainsPrivateKey,
    setUserVars,
}