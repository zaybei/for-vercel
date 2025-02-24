declare module '@lottiefiles/dotlottie-wc' {
  class DotLottie {
    constructor(options: {
      target: HTMLElement;
      props: {
        src: string;
        loop?: boolean;
        autoplay?: boolean;
      };
    });
  }
  export { DotLottie };
}
