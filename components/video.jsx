const Video = () => {
  return (
    <div>
      <video
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] z-50 max-w-none"
        autoPlay>
        <source src="/transition.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default Video;
