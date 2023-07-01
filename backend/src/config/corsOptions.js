// setting up cors
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "my-custom-header"],
  credentials: true,
  preflight: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
