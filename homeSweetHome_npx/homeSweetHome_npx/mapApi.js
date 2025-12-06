import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const shelters_map = express();
const PORT = 3000;
console.log("Loaded Google key:", process.env.GOOGLE_MAPS_KEY);

shelters_map.use(express.json());

shelters_map.post('/shelters', async (req, res) => {
  try {
    const { lat = 40.7128, lng = -74.0060 } = req.body;

    const googleResponse = await axios.post(
      'https://places.googleapis.com/v1/places:searchNearby',
      {
        
        locationRestriction: {
          circle: {
            center: { latitude: Number(lat), longitude: Number(lng) },
            radius: 5000
          }
        },
        includedTypes: ["pet_store", "veterinary_care"],
        maxResultCount: 20
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': process.env.GOOGLE_MAPS_KEY,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.location'
        }
      }
    );


    const shelters = googleResponse.data.places?.map((place) => ({
      id: place.id,
      name: place.displayName?.text,
      latitude: place.location?.latitude,
      longitude: place.location?.longitude,
      phone: null,
      website: null
    })) || [];

    res.json(shelters);
  } catch (error) {
    console.error(error?.response?.data || error);
    res.status(500).json({ error: "Failed to load shelters :(" });
  }
});

shelters_map.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
