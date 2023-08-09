// setting up cors
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000/graphql",
    "https://studio.apollographql.com",
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization", "Clientpathname"],
  credentials: true,
  preflight: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
