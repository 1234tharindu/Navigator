import { LoginImg } from "../../assets";

const LoginContainer = ({ children, LoginHeight, LoginSpace }) => {
  const LSpace = {
    height: LoginSpace,
  };
  const LHeight = {
    height: LoginHeight,
  };

  return (
    <div className="md:flex ">
      <div className="w-[600px] flex flex-col justify-center max-md:hidden pt-[150px] mr-[30px] ">
        <div>
          <img alt="" src={LoginImg} className="md:w-[600px]"></img>
        </div>
        <div
          className="ml-[10vw] items-center ml-3 mr-3 max-[1100px]:text-xl text-4xl font-bold text-right text-primary2"
          style={{ textShadow: "0 0 5px white" }}
        >
          Save water today, secure your tomorrow.
        </div>
      </div>

      <div className="md:hidden " style={LSpace}>
        <img alt="" src={LoginImg} className="md:w-[300px] pt-6"></img>
      </div>

      <div className="flex justify-end md:flex-1 ">
        <div className="md:w-[500px] w-[768px]  ">
          <div className="md:hidden"></div>

          <div
            className="bg-primary4  md:min-h-screen flex flex-col items-center md:justify-center 
          rounded-tl-[60px] md:rounded-bl-[60px] rounded-tr-[60px] rounded-bl md:rounded-tr
          pt-0 pb-0 "
            style={LHeight}
          >
            <div className="max-md:animate-fade-up max-md:animate-once ">
              <div className="md:animate-fade-left md:animate-once ">
                <div>{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
