let globalRouter = null;
export const setGlobalRouter = (router) => {
    globalRouter = router;
}

export const redirectToPath = (path) => {
    if(globalRouter) {
        globalRouter.push(path)
    }
}