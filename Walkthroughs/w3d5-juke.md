# [W3D5 Juke Walkthrough](https://github.com/FullstackAcademy/PairProject.Juke)
[⬅ Go Back](./walkthrough-directory.md)

## Instructions
- `npm install`
- `createdb juke`
- `npm run seed`
- `npm start`

## Milestone: Database
- `server/db/Album.js`
  ```Javascript
  const Sequelize = require('sequelize');
  const db = require('./db')

  const Album = db.define('album', {
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      artworkUrl: {
          type: Sequelize.STRING,
          defaultValue: "default-album.jpg"
      }
  })

  module.exports = Album;
  ```
- `server/db/Arist.js`
  ```Javascript
  const Sequelize = require('sequelize');
  const db = require('./db')

  const Artist = db.define('artist', {
      name: {
          type: Sequelize.STRING,
          allowNull: false
      }
  })

  module.exports = Artist;
  ```
- `server/db/Song.js`
  ```Javascript
  const Sequelize = require('sequelize');
  const db = require('./db')

  const Song = db.define('song', {
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      audioURL: Sequelize.STRING,
      genre: Sequelize.STRING
  })

  module.exports = Song
  ```
- `server/db/index.js`
  - Make associations!
    - Artists can have multiple albums and songs
    - An album can have multiple songs
  ```Javascript
  const db = require('./db')
  const Album = require('./Album')
  const Artist = require('./Artist')
  const Song = require('./Song')

  Artist.hasMany(Album)
  Album.belongsTo(Artist)

  Artist.hasMany(Song)
  Song.belongsTo(Artist)

  Album.hasMany(Song)
  Song.belongsTo(Album)

  module.exports = {
    db, Album, Artist, Song
  }
  ```
## Milestone: Routes
- `server/api/index.js` - add router for albums
  ```Javascript
  router.use('/albums', require('./albums'))
  ```
- `server/api/album.js` - routed to '/api/albums'
  - Import `router` and databases
    ```Javascript
    const router = require('express').Router();
    const { Song, Album, Artist } = require('../db');
    ```
  - GET '/api/albums'
    - Return all albums including the artist for the album
    ```Javascript
    router.get('/', async(req, res, next) => {
      try {
        const albums = await Album.findAll({
          include: [Artist]
        })
        res.send(albums)
      }catch(err) {
        next(err)
      }
    })
    ```
  - GET '/api/albums/:albumid'
    - Return a SINGLE album pased on the id in URL (`findByPk`) including the artist and songs for the album
    - Use `req.params.albumId` to grab the wildcard id
    ```Javascript
    router.get("/:albumId", async (req, res, next) => {
      try { 
      const album = await Album.findByPk(req.params.albumId, {
          include: [Artist, Song], 
      }); 
      res.send(album); 
      } catch (error) {
        next(error);
      }
    });
    ```
## Milestone: All Albums
- `client/Main.js`
  - Load dummy data by harcoding (data[0]...)
  - Load real data
    - Set state
      ```Javascript
      this.state = {
        albums: [],
      }
      ```
    - async `componentDidMount` to get AJAX request for data
      - Call `this.setState()` to update state
      ```Javascript
      async componentDidMount() {
        try {
          const { data } = await axios.get('/api/albums')
          this.setState({albums: data})
        } catch(err) {
          console.log(err)
        }
      }
      ```
      - `console.log(this.state)` has {`albums`: [{`artist`: {`id`, `name`}, `artistId`, `artworkUrl`, `id`, `name`}]}
    - Make `AllAlbums.js` in `client`
      - Move JSX for album from `Main` to `AllAlbums`
      - Pass in `albums` as props for `AllAlbums`
      ```Javascript
      // Main.js
      <div className='container'>
        <div id='albums' className='row wrap'>
          <AllAlbums albums={this.state.albums}/>
        </div>
      </div>

      // AllAlbums.js
      import React from 'react'

      export default function AllAlbums(props) {
        const { albums } = props
        return (
          albums.map((album) => {
            return (
              <div className='album' key={album.id}>
                <a>
                  <img src={album.artworkUrl} />
                  <p>{album.name}</p>
                  <small>{album.artist.name}</small>
                </a>
              </div>
            )
          })
        )
      }
      ```
## Milestone: Single Album
- Make `SingleAlbum.js` in `client`
  - Import JSX
  - In `Main.js` add to `this.state`
    ```Javascript
    this.state = {
      albums: [],
      selectedAlbum: {}
    }
    ```
    - Also edit `<AllAlbums />` to include passing `pickAlbum` as props
      ```Javascript
      <div className='container'>
        <div id='albums' className='row wrap'>
          <AllAlbums albums={this.state.albums} pickAlbum={this.pickAlbum} />
        </div>
      </div>
      ```
    - Make a method to reflect that a specific album has been selected
      - Don't forget to bind in constructor
      ```Javascript
      this.pickAlbum = this.pickAlbum.bind(this)
      ...
      async pickAlbum(albumId) {
        try{
          const { data } = await axios.get(`/api/albums/${albumId}`)
          this.setState({ selectedAlbum: data })
        }catch(err) {
          console.error(err)
        }
      }
      ```
    - `client/AllAlbums.js`
      - Attach `pickAlbum` as an `onClick` listener for each album (attach to `<a>`)
      ```Javascript
      <div className='album' key={album.id}>
        <a onClick={() => props.pickAlbum(album.id)}>
          <img src={album.artworkUrl} />
          <p>{album.name}</p>
          <small>{album.artist.name}</small>
        </a>
      </div>
      ```
    - `client/Main.js`
      - Make a ternary for what to show
        - If `this.state.selectedAlbum.id` is true aka something was selected, display `SingleAlbum`
        - If false, display `AlbumList` which is a list of all albums

      ```Javascript
      <div className='container'>
        {this.state.selectedAlbum.id ? (
          <SingleAlbum album={this.state.selectedAlbum}/>
        ) : (
          <div id='albums' className='row wrap'>
            <AllAlbums albums={this.state.albums} pickAlbum={this.pickAlbum]}/>
          </div>
        )}
      </div>
      ```
      - Map out the songs
        ```Javascript
        import React from 'react'

        export default function SingleAlbum(props) {
          const { album } = props;
          
          return (
            <div id='single-album' className='column'>
              <div className='album'>
                <a>
                  <img src={album.artworkUrl} />
                  <p>{album.name}</p>
                  <small>{album.artist.name}</small>
                </a>
              </div>
              
              <table id='songs'>
                <tbody>
                  <tr className='gray'>
                    <td />
                    <td>#</td>
                    <td>Name</td>
                    <td>Artist</td>
                    <td>Genre</td>
                  </tr>

                  {props.album.songs.map((song) => (
                    <tr key={song.id}>
                      <td><i className='fa fa-play-circle' /></td>
                      <td>{song.id}</td>
                      <td>{song.name}</td>
                      <td>{props.album.artist.name}</td>
                      <td>{song.genre}</td>
                    </tr>
                  ))}

                </tbody>
              </table>

              <div id='player-container'>
                <div id='player-controls'>
                  <div className='row center'>
                    <i className='fa fa-step-backward'></i>
                    <i className='fa fa-pause-circle'></i>
                    <i className='fa fa-step-forward'></i>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        ```
      - Deselect an album
        - Method will "reset" `selectedAlbum` back to its initial state (don't forget to bind)
        - Make `Sidebar.js` in `client` 
        - Attach deselecting prop as a clickhandler in `Sidebar`
        - Import `Sidebar` into `Main` and replace JSX
      ```Javascript
      // Main.js
      this.deselectAlbum = this.deselectAlbum.bind(this)
      ...
      deselectAlbum () {
        this.setState({
          selectedAlbum: {}
        })
      }
      render () {
        return (
          <div id='main' className='row container'>
            <Sidebar deselectAlbum={this.deselectAlbum}/>

            <div className='container'>
              {this.state.selectedAlbum.id ? (
                <SingleAlbum album={this.state.selectedAlbum}/>
              ) : (
                <div id='albums' className='row wrap'>
                  <AllAlbums albums={this.state.albums} pickAlbum={this.pickAlbum}/>
                </div>
              )}
            </div>

            <div id='player-container'>
              <div id='player-controls'>
                <div className='row center'>
                  <i className='fa fa-step-backward'></i>
                  <i className='fa fa-pause-circle'></i>
                  <i className='fa fa-step-forward'></i>
                </div>
              </div>
            </div>
          </div>
        )
      }
      // Sidebar.js
      import React from 'react'

      const Sidebar = (props) => {
        const deselectAlbum = props.deselectAlbum

        return (
          <div id='sidebar'>
            <img src='juke.svg' id='logo' />
            <section>
              <h4>
                <a onClick={deselectAlbum}>ALBUMS</a>
              </h4>
            </section>
          </div>
        )
      }

      export default Sidebar
      ```
## Milestone: Music Player
- Unfinished...