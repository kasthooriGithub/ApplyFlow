import React from "react";
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";
import { Close as CloseIcon, PlayCircleFilled as PlayIcon } from "@mui/icons-material";

const DemoVideoModal = ({ open, onClose }) => {
  // Using a professional-looking placeholder demo video
  // Replace with actual ApplyFlow demo video URL
  const videoUrl = "https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1&mute=0&rel=0";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={500}
      PaperProps={{
        sx: {
          bgcolor: "transparent",
          boxShadow: "none",
          overflow: "visible",
          borderRadius: 4,
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Box sx={{ position: "relative", width: "100%", pt: "56.25%" /* 16:9 Aspect Ratio */ }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: -48,
            right: { xs: 0, md: -48 },
            color: "white",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.2)",
              transform: "rotate(90deg)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Video Embed */}
        <Box
          component="iframe"
          src={open ? videoUrl : ""}
          title="ApplyFlow Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 4,
            boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5)",
            bgcolor: "black",
          }}
        />
      </Box>

      {/* View-Only Disclaimer Overlay (Optional/Subtle) */}
      <Box
        sx={{
          mt: 2,
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 500, letterSpacing: 0.5 }}>
          APPLYFLOW DEMO • VIEW-ONLY MODE
        </Typography>
      </Box>
    </Dialog>
  );
};

export default DemoVideoModal;
