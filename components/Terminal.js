import Typewriter from 'typewriter-effect';

export default () => <Typewriter
  options={{
    strings: ['Hello', 'World'],
    autoStart: true,
    loop: true,
  }}
/>;
