// import { EmblemofSriLanka, intropag, logogov } from "../assets";

const Footer = () => {
  return (
    <div className="text-white max-md:text-[12px] p-5 font-bold w-full h-[300px] md:h-[255px] bg-primary2 flex items-center md:justify-around max-md:justify-between animate-fade-up animate-once -z-10">
      {/* info */}
      <div className="flex flex-col mr-3 max-md:pr-5">
        <div className="flex flex-row items-center mb-3">
          <div className="flex items-center text-xl">
            <ion-icon name="mail-outline"></ion-icon>
          </div>
          info@waterboard.lk
        </div>
        <div className="flex flex-row items-center">
          <div className="flex items-center text-xl">
            <ion-icon name="call-outline"></ion-icon>
          </div>
          <div className="mr-1 text-red-500">1939</div> Hotline
        </div>
        <div className="flex flex-col mt-3">
          <span>Address</span>
          <span>National Water Supply and Drainage Board</span>
          <span>Galle Road,</span>
          <span>Ratmalana,</span>
          <span>Sri Lanka.</span>
        </div>
      </div>

      {/* logos
      <div className="flex flex-col mr-3">
        <a href="http://www.mcpws.gov.lk/" className="flex flex-row items-center mb-3">
          <img src={EmblemofSriLanka} className="h-[70px] max-md:h-[50px]"></img>
          <div className="flex items-center ml-3">
            Ministry of Water Supply
          </div>
        </a>

        <a href="https://gic.gov.lk/gic/">
          <img src={intropag} className="w-[240px]"></img>
        </a>

        <a href="https://www.gov.lk/"  className="flex flex-row items-center mt-3">
        <img src={logogov} className="w-[70px] max-md:w-[50px] "></img> 
        <div className="flex items-center ml-1">Government of Sri Lanka</div>
        </a>
        
      </div> */}

      {/* Map */}
      <div className="h-[200px] max-md:ml-3 w-[300px] max-md:hidden">
        <iframe
          title="Pinned Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.671905649585!2d79.88079807478645!3d6.809704319771667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2452dd1d7c82f%3A0xc26a5b990d9590ff!2sNational%20Water%20Supply%20%26%20Drainage%20Board%20-%20Head%20Office!5e0!3m2!1sen!2slk!4v1699595007338!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Footer;
