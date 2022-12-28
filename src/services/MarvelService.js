class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=82418d30bdc8b6f6505d25cc5e53ca80';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformChracter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformChracter(res.data.results[0]);
    }

    _transformChracter = (char) => {
        if (char.description.length > 0) {
            if (char.description.length > 228) {
                char.description = char.description.slice(0, 210) + '...';
            }
        } else {
            char.description = 'Can`t find any description'
        }

        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + `.` + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;
