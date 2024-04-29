import { CardDescription, CardTitle } from "@/components/ui/card";
import { handleInputBlur, handleInputFocus } from "../../../../home/components/utils/handleInput/HandleInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const PasswordUpdateWithNewPasswordModal = ({ label, value, onChange, onClick }) => (
  <div className="grid gap-5">
    <CardTitle>Update Password</CardTitle>
    <CardDescription>{label}</CardDescription>

    <Input
      id="password"
      label="New password"
      value={value}
      onChange={onChange}
      onMouseEnter={() => handleInputFocus('passwordLabel')}
      onMouseLeave={() => handleInputBlur('passwordLabel')}
    />

    <Button onClick={onClick}>to check!</Button>
  </div>
);