"use client";
import Modal from "../dynamic-component/modal";
import SignInButton from "../auth/SignInButton";

export default function LoginPage({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className="z-50">
      <Modal isOpen={isOpen} formName="Login" onClose={onClose}>
        <div className="flex flex-col gap-4">
          <SignInButton />
        </div>
      </Modal>
    </div>
  );
}
