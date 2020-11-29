import React, { Component } from "react";
import axios from "axios";
import { Modal, Row, Col } from "antd";
import "antd/dist/antd.css";
export default class pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokedex: [],
      visible: false,
      name: "",
      nationalPokedexNumber: "",
      types: "",
    };
  }

  handleButton = (name) => {
    alert(name);
  };

//   handleTambahPokemon = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleHapusPokemon = () => {
//     this.setState({
//       visible: true,
//     });
//   };

  handleName = (e) => {
    this.setState({
      nama: e.target.value,
    });
    console.log(this.state.name);
  };
  handleNationalPokedexNumber = (e) => {
    this.setState({
      nim: e.target.value,
    });
    console.log(this.state.nationalPokedexNumber);
  };
  handleTypes = (e) => {
    this.setState({
      asal: e.target.value,
    });
    console.log(this.state.types);
  };

  handleButtonDetail = (imageUrlHiRes, supertype, subtype, hp, series) => {
    this.setState({
      visible: true,
      imageUrlHiRes: imageUrlHiRes,
      supertype: supertype,
      subtype: subtype,
      hp: hp,
      series: series,
    });
  };

//   handleSubmit = () => {
//     if (
//       this.state.name !== "" &&
//       this.state.nationalPokedexNumber !== "" &&
//       !this.state.types !== ""
//     ) {
//       axios({
//         method: "post",
//         url: "https://api.pokemontcg.io/v1/cards?subtype=Basic/add",
//         headers: {
//           accept: "*/*",
//         },
//         data: {
//           name: this.state.name,
//           nationalPokedexNumber: this.state.nationalPokedexNumber,
//           types: this.state.types,
//         },
//       })
//         .then((data) => {
//           alert("berhasil menambahkan pokemon");
//           window.location.reload();
//         })
//         .catch((error) => {
//           alert("gagal menambahkan pokemon");
//         });
//     } else {
//       alert("pastikan semua kolom sudah terisi");
//     }
//   };

  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.pokemontcg.io/v1/cards?subtype=Basic",
      headers: {
        accept: "*/*",
      },
    })
      .then((data) => {
        console.log(data.data.cards);
        this.setState({
          pokedex: data.data.cards,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

//   handleDelete = () => {
//     if (
//       this.state.name !== "" &&
//       this.state.nationalPokedexNumber !== "" &&
//       !this.state.types !== ""
//     ) {
//       axios({
//         method: "delete",
//         url: "https://api.pokemontcg.io/v1/cards?subtype=Basic/id",
//         headers: {
//           accept: "*/*",
//         },
//         data: {
//           name: this.state.name,
//           nationalPokedexNumber: this.state.nationalPokedexNumber,
//           types: this.state.types,
//         },
//       })
//         .then((data) => {
//           alert("pokemon berhasil dihapus");
//           window.location.reload();
//         })
//         .catch((error) => {
//           alert("pokemon gagal dihapus");
//         });
//     }
//   };

  render() {
    return (
      <div>
        <div className="boxWhite">
          <center>
            <h1>List Kartu Pokemon</h1>
          </center>
          <center>

          <Modal
            title= {this.state.name}
            centered
            visible={this.state.visible}
            onOk={() => this.setState({ visible: false })}
            onCancel={() => this.setState({ visible: false })}
            width={500}
            >
            <div style={{ textAlign: "center" }}>
            <p><img src={this.state.imageUrlHiRes} width="400" height="500"/> </p>

            <b>
            <p>Supertype : {this.state.supertype} </p>
            <p>Subtype : {this.state.subtype} </p>
            <p>HP : {this.state.hp} </p>
            <p>Series : {this.state.series} </p>
            
            </b>
            </div>
          </Modal>

            {/* <button onClick={this.handleTambahPokemon}>Tambah Pokemon</button>  */}
          </center>
          {/* <Modal
            title="Tambah Pokemon"
            centered
            visible={this.state.visible}
            onOk={this.handleSubmit}
            onCancel={() => this.setState({ visible: false })}
            width={600}
          >
            <div style={{ textAlign: "center" }}>
              <p>Name : </p>{" "}
              <input
                type="text"
                placeholder="Nama Pokemon"
                onChange={this.handleName}
              />
              <br />
              <p>National Pokedex Number : </p>{" "}
              <input
                type="text"
                placeholder="Nomor Pokedex"
                onChange={this.handleNationalPokedexNumber}
              />
              <br />
              <p>Types : </p>{" "}
              <input
                type="text"
                placeholder="Tipe Pokemon"
                onChange={this.handleTypes}
              />
              <br />
            </div>
          </Modal> */}

          {this.state.pokedex.map((results, index) => {
            return (
              <div className="card" key={results.name}>
                <div className="card-body">
                  <h5 className="card-title">Nama : {results.name}</h5>
                  <h5 className="card-subtitle mb-2 text-muted">
                    National Pokedex Number : {results.nationalPokedexNumber}
                  </h5>
                  <h5 className="card-text">Types : {results.types}</h5>
                  <img
                    src={results.imageUrl}
                    style={{ width: "100px", height: "100" }}
                  />
                </div>
                <button
                  className="button"
                  onClick={() => this.handleButton(results.artist)}
                >
                  {" "}
                  Artist Names
                </button>
                <button
                  className="button"
                  onClick={() =>
                    this.handleButtonDetail(
                      results.imageUrlHiRes,
                      results.supertype,
                      results.subtype,
                      results.hp,
                      results.series
                    )
                  }
                >
                  {" "}
                  Other Informations
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
