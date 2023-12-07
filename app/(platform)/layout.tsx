import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalProvider } from "@/components/providers/modal-provider";
import { QuryProvider } from "@/components/providers/query-provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <QuryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QuryProvider>
    </ClerkProvider>
  );
};

export default PlatformLayout;
