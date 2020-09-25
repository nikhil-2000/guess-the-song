export class SearchResult {

  constructor(private name, private artist) {
    this.name = name;
    this.artist = artist;
  }

  getName(): string{
    return this.name;
  }

  getArtist(): Array<any> {
    return this.artist;
  }
}

