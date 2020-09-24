export class Track {

  constructor(private name: string ,private preview,private popularity,private artists,private album) {
    this.name = name;
    this.preview = preview;
    this.popularity = popularity;
    this.artists = artists;
    this.album = album;
  }

  getName(): string {
    return this.name;
  }

  getPreview(): string {
    return this.preview;
  }

  getPopularity(): number {
    return this.popularity;
  }

  getArtists(): Array<any> {
    return this.artists;
  }

  getAlbum(): any {
    return this.album;
  }

}
