import React, {Component} from 'react'
import FormError from './FormError'
import axios from 'axios';
import { navigate } from '@reach/router'

class PictureFilter extends Component{

  constructor(props){
    super(props)
    this.state = {
      file: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })

  }

  myFunction() {
    var checkBox = document.getElementById("myCheck");
    var lut = document.getElementById("lut");
    var bri = document.getElementById("bri");
    var expo = document.getElementById("expo");
    var contrast = document.getElementById("contrast");
    var warmth = document.getElementById("warmth");
    var saturation = document.getElementById("saturation");
    var vitality = document.getElementById("vitality");
    var matrix = document.getElementById("matrix");
    var gamma = document.getElementById("gamma");
    
    if (checkBox.checked == true){
      lut.style.display = "block";
      bri.style.display = "block";
      expo.style.display = "block";
      contrast.style.display = "block";
      warmth.style.display = "block";
      saturation.style.display = "block";
      vitality.style.display = "block";
      matrix.style.display = "block";
      gamma.style.display = "block";
    } else {
       lut.style.display = "none";
       bri.style.display = "none";
       expo.style.display = "none";
       contrast.style.display = "none";
       warmth.style.display = "none";
       saturation.style.display = "none";
       vitality.style.display = "none";
       matrix.style.display = "none";
       gamma.style.display = "none";
    }
  }

    handleSubmit(e){
        
        let path = document.getElementById("imagePath").files[0].name;
        let imageName = document.getElementById("newImageName").value;

        var items=document.getElementsByName('service');
        var checkBox = document.getElementById("myCheck");

        var lut;
        var bri;
        var expo;
        var contrast;
        var warmth;
        var saturation;
        var vitality;
        var matrix;
        var gamma;
        var selectedServices="";
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox' && items[i].checked==true)
                selectedServices = selectedServices + " " + items[i].value;
        }
        if(selectedServices == ''){
          alert("Debe escoger minimo un filtro");
          e.preventDefault();
          return
        }

        if (checkBox.checked == true){
          lut = document.getElementById("vallut").value;
          bri = document.getElementById("valbri").value;
          expo = document.getElementById("valexpo").value;
          contrast = document.getElementById("valcon").value;
          warmth = document.getElementById("valcal").value;
          saturation = document.getElementById("valsat").value;
          vitality = document.getElementById("valvit").value;
          matrix = document.getElementById("valmat").value;
          gamma = document.getElementById("valgam").value;

          alert(lut)
          alert(bri)
          alert(expo)
          alert(contrast)
          alert(warmth)
          alert(saturation)
          alert(vitality)
          alert(matrix)
          alert(gamma)

        }


        alert("Se aplican filtros");
        alert(path)
        alert(imageName)
        alert(selectedServices)

        e.preventDefault();

    }
    
    render(){
        return(
            <div className="text-center mt-4">
    <form className="mt-3" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">PictureFilters</h3>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <label className="form-control-label sr-only" htmlFor="Matricula">
                            Escoge una imagen
                      </label>
                      <input type="file" id="imagePath" name="imagepath" accept="image/png, image/jpeg, image/gif" required onChange={this.handleChange}/>
                    </section>
                    <section className="form-group text-right mb-0">
                      <img src={this.state.file}/>
                    </section>
                  </div>
                  <div className="form-row">

                  <section className="col-sm-6 form-group">
                      <label className="form-control-label sr-only" htmlFor="Nombre">
                            Nombre de archivo generado
                      </label>
                      <input
                        className="form-control" type="text" id="newImageName" placeholder="Nombre de archivo generado" name="newImageName" required/>
                    </section>

                  </div>

                  <div className="form-row">
                    <section className="col-sm-6 form-group">

                    <p className="left colorText">Filtros a aplicar:</p>

                      <p>
                        <label>
                          <input type="checkbox" name="service" value="blur"/>
                          <span> Difuminar</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input id="myCheck" type="checkbox" name="service" value="3dlut" onClick={this.myFunction}/>
                          <span> 3DLUT</span>
                        </label>
                      </p>
                      <label className="text-right" id="lut" style={{display:"none"}}> 
                        <span>Tamaño de LUT (2 a 65):</span> 
                        <input type="number" min="2" max="65" step=".01" id="vallut" name="vallut"/>
                      </label>

                      <label className="text-right" id="bri" style={{display:"none"}}> 
                        <span>Brillo (-1 a 1):</span> 
                        <input type="number" min="-1" max="1" step=".01" id="valbri" name="valbri"/>
                      </label>

                      <label className="text-right" id="expo" style={{display:"none"}}> 
                        <span>Exposición (-5 a 5):</span> 
                        <input type="number" min="-5" max="5" step=".01" id="valexpo" name="valexpo"/>
                      </label>

                      <label className="text-right" id="contrast" style={{display:"none"}}> 
                        <span>Contraste (-1 a 5):</span> 
                        <input type="number" min="-1" max="5" step=".01" id="valcon" name="valcon"/>
                      </label>

                      <label className="text-right" id="warmth" style={{display:"none"}}> 
                        <span>Calidez (-1 a 1):</span> 
                        <input type="number" min="-1" max="1" step=".01" id="valcal" name="valcal"/>
                      </label>

                      <label className="text-right" id="saturation" style={{display:"none"}}> 
                        <span>Saturación (-1 a 5):</span> 
                        <input type="number" min="-1" max="5" step=".01" id="valsat" name="valsat"/>
                      </label>

                      <label className="text-right" id="vitality" style={{display:"none"}}> 
                        <span>Vitalidad (-1 a 5):</span> 
                        <input type="number" min="-1" max="5" step=".01" id="valvit" name="valvit"/>
                      </label>

                      <label className="text-right" id="matrix" style={{display:"none"}}> 
                        <span>Matriz (0 a 1):</span> 
                        <input type="number" min="0" max="1" step=".01" id="valmat" name="valmat"/>
                      </label>

                      <label className="text-right" id="gamma" style={{display:"none"}}> 
                        <span>Gammma (0 a 10):</span> 
                        <input type="number" min="0" max="10" step=".01" id="valgam" name="valgam"/>
                      </label>

                      <p >
                        <label>
                        <input type="checkbox" name="service" value="edge_enhance"/>
                        <span> Mejorar bordes</span>
                        </label>
                      </p>
                      <p>
                        <label>
                        <input type="checkbox" name="service" value="edges"/>
                        <span> Encontrar bordes</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="checkbox" name="service" value="contour"/>
                          <span> Contorno</span>
                        </label>
                      </p>
                      <p>
                        <label>
                          <input type="checkbox" name="service" value="emboss"/>
                          <span> Realzar</span>
                        </label>
                      </p>
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      CrearImagen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
            </div>
        );
    }
}
export default PictureFilter;