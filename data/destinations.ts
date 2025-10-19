// data/destinations.ts
import { ImageSourcePropType } from "react-native";

export type Destination = {
  id: string;
  name: string;
  country: string;
  image: ImageSourcePropType;
  description: string;
  tripUrl: string;  
};

const destinations: Destination[] = [
  {
    id: "banff",
    name: "Banff",
    country: "Canada",
    image: require("../assets/destinations/banff.jpg"),
    description:
      "Emerald lakes and towering peaks in the Canadian Rockies. Hike around Lake Louise or take the Banff Gondola for panoramic views.",
    tripUrl:
      "https://www.tripadvisor.com/Attractions-g154911-Activities-Banff_Banff_National_Park_Alberta.html",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    image: require("../assets/destinations/bangkok.jpg"),
    description:
      "Glittering temples, lively street markets, and world-class street food. Cruise the Chao Phraya at sunset and visit Wat Arun and the Grand Palace.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g293916-Activities-Bangkok.html",
  },
  {
    id: "cusco",
    name: "Cusco (Machu Picchu)",
    country: "Peru",
    image: require("../assets/destinations/cusco.jpg"),
    description:
      "The gateway to the Sacred Valley. Acclimate in Cusco, ride the train to Aguas Calientes, and explore the terraces of Machu Picchu at dawn.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g294314-Activities-Cusco_Cusco_Region.html",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    image: require("../assets/destinations/dubai.jpg"),
    description:
      "Futuristic skyline meets desert adventures. Head up Burj Khalifa, stroll Dubai Marina, and take a dune safari at golden hour.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g295424-Activities-Dubai_Emirate_of_Dubai.html",
  },
  {
    id: "dublin",
    name: "Dublin",
    country: "Ireland",
    image: require("../assets/destinations/dublin.jpg"),
    description:
      "Friendly pubs, Georgian streets, and literary history. Walk across the Ha’penny Bridge, tour Trinity College, and catch live trad music.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g186605-Activities-Dublin_County_Dublin.html",
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    image: require("../assets/destinations/kyoto.jpg"),
    description:
      "Shrines, gardens, and tea houses. Wander the vermilion gates at Fushimi Inari, then slow down in Arashiyama’s bamboo grove.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g298564-Activities-Kyoto_Kyoto_Prefecture_Kinki.html",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: require("../assets/destinations/paris.jpg"),
    description:
      "Walk along the Seine at twilight, picnic on the Champs de Mars, and savor a café crème. Don’t miss the Eiffel Tower and the Louvre.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g187147-Activities-Paris_Ile_de_France.html",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    image: require("../assets/destinations/rome.jpg"),
    description:
      "Ancient forums and Renaissance piazzas. Tour the Colosseum, toss a coin into Trevi Fountain, and linger over cacio e pepe in Trastevere.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g187791-Activities-Rome_Lazio.html",
  },
  {
    id: "santorini",
    name: "Santorini (Oia)",
    country: "Greece",
    image: require("../assets/destinations/santorini.jpg"),
    description:
      "Whitewashed villages perched over a blue caldera. Hike Fira→Oia, sip Assyrtiko at a cliffside winery, and catch a legendary sunset.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g189433-Activities-Santorini_Cyclades_South_Aegean.html",
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    image: require("../assets/destinations/sydney.jpg"),
    description:
      "Iconic harbour life and coastal walks. Photograph the Opera House, ferry to Manly, and do the Bondi to Coogee cliffside trail.",
    tripUrl: "https://www.tripadvisor.com/Attractions-g255060-Activities-Sydney_New_South_Wales.html",
  },
];

export default destinations;
