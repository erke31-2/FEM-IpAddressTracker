import { FormEvent, useState } from "react";
import { geoProps } from "../App";
import arrowIcon from "../assets/images/icon-arrow.svg"
type Props = {
  data?: geoProps;
  setIpAddress: React.Dispatch<React.SetStateAction<string | null>>;
};

const Header = ({ data, setIpAddress }: Props) => {
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const isValidIpAddress = (ipAddress: string): boolean => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    return ipv4Regex.test(ipAddress) || ipv6Regex.test(ipAddress);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidIpAddress(input)) {
      setIpAddress(input);
      setInput("");
      setIsError(false)
    } else {
      setIsError(true);
    }
  };

  return (
    <header className="header">
      <h1>IP Address Tracker</h1>

      <form className="form" onSubmit={handleSubmit}>
        {isError && <p className="error-text">Invalid IP Address!</p>}
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="form-input"
            placeholder="Search for any IP address or domain"
          />
          <button className="btn-submit" type="submit">
            <img src={arrowIcon} alt="arrow-icon" />
          </button>
        </div>
      </form>
      <ul className="data-fields">
        <li className="data-field">
          <label htmlFor="ip-address">Ip Address</label>
          <p id="ip-address">{data?.ip}</p>
        </li>
        <li className="data-field">
          <label htmlFor="location">Location</label>
          <p id="location">
            {data?.location.city}, {data?.location.country}
          </p>
        </li>
        <li className="data-field">
          <label htmlFor="timezone">Timezone</label>
          <p id="timezone">UTC {data?.location.timezone}</p>
        </li>
        <li className="data-field">
          <label htmlFor="isp">Isp</label>
          <p className="isp">{data?.isp}</p>
        </li>
      </ul>
    </header>
  );
};
export default Header;
