var userVars = {
    private_key: undefined,
    public_key: undefined,
}

export function containsPrivateKey() {
    if (userVars.private_key === undefined) {
        return false;
    }

    return true;
}

export function setUserVars(private_key) {
    userVars.private_key = private_key;
    // userVars.public_key = public_key;
}
