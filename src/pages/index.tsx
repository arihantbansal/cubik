import { motion, useAnimation, useMotionValue } from 'framer-motion';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const imgAnimation = useAnimation();
  const img =
    'https://images.pexels.com/photos/4226939/pexels-photo-4226939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  const resetPosition = {
    x: 0,
    y: 0,
    transition: {
      type: 'tween',
      duration: 1,
      easings: ['easeOut', 'easeIn'],
    },
  };
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;
    const offsetFactor = 15;
    x.set(moveX / offsetFactor);
    y.set(moveY / offsetFactor);
    imgAnimation.start({
      x: moveX / offsetFactor,
      y: moveY / offsetFactor,
      transition: {
        type: 'tween',

        duration: 1,
        easings: ['easeOut', 'easeIn'],
      },
    });
  };

  const handleMouseLeave = () => {
    // Reset the position of the mouse to the center of the screen
    x.set(0);
    y.set(0);
    imgAnimation.start(resetPosition);
  };

  return (
    <div
      style={{
        border: '1px solid red',
        width: '100rem',
        height: '100rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          width: '30rem',
          position: 'absolute',
          border: '1px solid red',
          overflow: 'hidden',
        }}
      >
        <motion.img
          animate={imgAnimation}
          src={img}
          style={{
            width: '40rem',
            transform: 'scale(1.2)',
            position: 'relative',
          }}
          alt="Woman in a red dress"
        />
      </div>
      <div className="img-bg" />
    </div>
  );
};

export default Home;
