import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=82418d30bdc8b6f6505d25cc5e53ca80';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChracter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChracter(res.data.results[0]);
    }

    const _transformChracter = (char) => {
        if (char.description.length > 0) {
            if (char.description.length > 228) {
                char.description = char.description.slice(0, 210) + '...';
            }
        } else {
            char.description = 'Can`t find any description'
        }

        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + `.` + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error,clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;
