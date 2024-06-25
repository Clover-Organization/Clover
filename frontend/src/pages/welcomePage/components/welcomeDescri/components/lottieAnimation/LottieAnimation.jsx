import Lottie from 'react-lottie';
import animationData from './coding-animation.json';

const LottieAnimation = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full">
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    );
  }

export default LottieAnimation;