import { Box, Typography, Button, Card } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFeatureStore } from "../../store/useFeatureStore";

const POST_ID = "godfm3ubu4597m2";

export default function Banner() {
  const feature = useFeatureStore((s) =>
    s.features.find((p) => p.id === POST_ID),
  );

  const fetchPostById = useFeatureStore((s) => s.fetchPostById);

  useEffect(() => {
    if (!feature) {
      fetchPostById(POST_ID);
    }
  }, [feature, fetchPostById]);

  if (!feature) return null;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        mb: 4,
        overflow: "hidden",
      }}
    >
      {feature.imageUrl && (
        <Box
          component="img"
          src={feature.imageUrl}
          alt={feature.title}
          sx={{
            width: { xs: "100%", sm: 200 },
            height: { xs: "100%", sm: 200 },
            objectFit: "cover",
          }}
        />
      )}

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.3rem", md: "1.8rem" },
            fontWeight: 700,
          }}
        >
          {feature.title}
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.95rem", md: "1rem" },
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {feature.excerpt}
        </Typography>

        <Box>
          <Button
            component={Link}
            to={`/post/${feature.slug}`}
            variant="outlined"
            size="small"
            sx={{
              mt: 1,
              textTransform: "none",
              color: "#a21717",
              borderColor: "#a21717",
              "&:hover": {
                borderColor: "#e64a19",
                backgroundColor: "rgba(255,87,34,0.08)",
              },
            }}
          >
            Leer más
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
