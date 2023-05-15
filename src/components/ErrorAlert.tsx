import { useRef } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Center } from "@chakra-ui/react";

type ErrorAlertProps = {
  error: string;
  onClose: () => void;
}

export const ErrorAlert = ({ error, onClose }: ErrorAlertProps) => {
  const cancelRef = useRef(null)

  return (
    <Center>
      <AlertDialog
        isOpen={error !== ''}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='2xl' fontWeight='bold'>
              {error}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
}