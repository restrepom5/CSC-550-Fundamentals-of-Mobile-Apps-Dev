import { useEffect, useState } from "react";
import axios from "axios";

type TeleportSearchResult = {
  matching_full_name: string;
};

type TeleportResponse = {
  _embedded: {
    "city:search-results": TeleportSearchResult[];
  };
};

type CityItem = {
  id: string;
  name: string;
  image: string;
};
const API_KEY = "15255d22200fecab9b76811b8d14ef99";
export default function useCitySearch(query?: string) {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const fetchCities = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct`,
          {
            params: {
              q: query,
              limit: 10,
              appid: API_KEY,
            },
          }
        );
        // format to your card structure
        const formatted = res.data.map((c: any) => ({
          id: `${c.lat},${c.lon}`,
          name: c.name,
          country: c.country,
          lat: c.lat,
          lon: c.lon,
          image:
            "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60",
        }));

        setResults(formatted);
      } catch (err) {
        console.log("City search error:", err);
      } finally {
        setLoading(false);}
    };

    let timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get<TeleportResponse>(
          `https://api.teleport.org/api/cities/?search=${query}`
        );

        const items = res.data._embedded["city:search-results"].map(
          (c: TeleportSearchResult) => ({
            id: c.matching_full_name,
            name: c.matching_full_name,
            image:
              "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
          })
        );

        setResults(items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, loading };
}
