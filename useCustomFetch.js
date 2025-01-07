import { useEffect } from "react";
import { useState } from "react";

//se utilza para no hacer llamadas extras a la api
//existe una libreria TanStack query que hace lo mismo
const localCache = {};

export const useCustomFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getPokemon();
  }, [url]);

  const setLoadingState = () =>
    setState({ data: null, isLoading: true, hasError: false, error: null });

  const getPokemon = async () => {
    if (localCache[url]) {      
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        error: null,
      });
      return;
    }

    setLoadingState();
    const response = await fetch(url);

    if (!response.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: response.status,
          message: response.statusText,
        },
      });
      return;
    }

    const data = await response.json();    

    //guardamos los datos obtenidos en un cache local para no hacer llamadas extras
    // de lo ya obtenido url = data
    localCache[url] = data;

    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
