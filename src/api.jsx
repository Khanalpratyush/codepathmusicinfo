export const getArtistData = async (searchInput) => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      const artistId = data.artists.items[0].id;
      const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const artistData = await artistResponse.json();
      return artistData;
    } else {
      throw new Error(data.error.message);
    }
  };
  
  export const getAlbumData = async (artistId, sortOption) => {
    const albumResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const albumData = await albumResponse.json();
    if (albumResponse.ok) {
      const sortedAlbums = sortAlbumData(albumData.items, sortOption);
      return sortedAlbums;
    } else {
      throw new Error(albumData.error.message);
    }
  };
  