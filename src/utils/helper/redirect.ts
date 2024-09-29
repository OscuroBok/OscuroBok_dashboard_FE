// import { Rou } from 'next/navigation';

let globalRouter: any = null;

export const setGlobalRouter = (router: any) => {
  globalRouter = router;
};

export const redirectToPath = (path: string) => {
  if (globalRouter) {
    globalRouter.push(path);
  }
};