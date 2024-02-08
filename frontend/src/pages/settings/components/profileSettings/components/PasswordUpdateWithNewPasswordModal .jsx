import InputField from "../../../../home/components/inputField/InputField";
import { handleInputBlur, handleInputFocus } from "../../../../home/components/utils/handleInput/HandleInput";

export const PasswordUpdateWithNewPasswordModal = ({ label, value, onChange, onClick }) => (
    <div className="password-update-modal">
      <h5>Update Password</h5>
      <p>{label}</p>
  
      <InputField
        id="password"
        label="New password"
        value={value}
        onChange={onChange}
        onMouseEnter={() => handleInputFocus('passwordLabel')}
        onMouseLeave={() => handleInputBlur('passwordLabel')}
      />
  
      <div className="btnSave">
        <button onClick={onClick}>to check!</button>
      </div>
    </div>
  );