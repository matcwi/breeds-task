import React, { FunctionComponent, useCallback, useEffect } from "react";
import "./App.css";
import "react-responsive-modal/styles.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { GET_ALL_BREEDS_URL } from "../../../constants";

import { BreedsList } from "./BreedsList";

export interface IBreed {
  id: number;
  breed: string;
  subBreed: string[];
}

const App: FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [breeds, setBreeds] = React.useState<IBreed[]>([]);
  const [error, setError] = React.useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await fetch(`${GET_ALL_BREEDS_URL}`).then((res) =>
        res.json()
      );

      if (data.status === "success") {
        let fetchedData: IBreed[] = [];
        let newId: number = 0;

        for (const breedName in data.message) {
          fetchedData.push({
            breed: breedName,
            subBreed:
              data.message[breedName].length > 0 ? data.message[breedName] : "",
            id: newId,
          });
          newId++;
        }
        setBreeds(fetchedData);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setBreeds]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="App">
      {breeds && breeds.length > 0 ? (
        <>
          <BreedsList
            breeds={breeds}
            setIsLoading={setIsLoading}
            setError={setError}
            isLoading={isLoading}
          />
        </>
      ) : isLoading ? (
        <div className="loading-spinner-container">
          <CircularProgress />
        </div>
      ) : (
        error && <p>Wystąpił błąd - odswież stronę</p>
      )}
    </div>
  );
};

export default App;
