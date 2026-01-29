import { useForm, type SubmitHandler } from "react-hook-form";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useCreateShortUrl } from "../hooks/useCreateShortUrl";

interface Props {
  setOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  originalUrl: string;
}

export default function CreateUrlModal({ setOpen, onClose }: Props) {
  // 1. Setup React Hook Form with Types
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { originalUrl: "" },
    mode: "onTouched",
  });

  // 2. Use our custom React Query hook
  const { mutate, isPending } = useCreateShortUrl(() => {
    onClose();
    reset(); // Clear form on success
  });

  // 3. Form Submission Handler
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    mutate({ longUrl: data.originalUrl });
  };

  return (
    <Modal open={setOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Create New Short URL
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Original URL"
            {...register("originalUrl", {
              required: "URL is required",
            })}
            error={!!errors.originalUrl}
            helperText={errors.originalUrl?.message}
            disabled={isPending}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Short Link"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
