import InputField from "../../../../home/components/inputField/InputField";
import { handleInputBlur, handleInputFocus } from "../../../../home/components/utils/handleInput/HandleInput";

export const PasswordUpdateModal = ({ label, value, onChange, onClick }) => (
    <div className="password-update-modal">
      <h5>Update Password</h5>
      <p>{label}</p>
  
      <InputField
        id="token"
        label="Token"
        value={value}
        onChange={onChange}
        onMouseEnter={() => handleInputFocus('tokenLabel')}
        onMouseLeave={() => handleInputBlur('tokenLabel')}
      />
  
      <div className="btnSave">
        <button onClick={onClick}>to check!</button>
      </div>
    </div>
  );