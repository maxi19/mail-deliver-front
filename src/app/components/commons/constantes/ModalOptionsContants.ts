import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { FileItem } from 'src/app/models/FileItem';
import { Personal } from 'src/app/models/personal';

export class ContantesModal{

    public static optModalDeleteRecibo: ModalOptions = {
        initialState: {
          title: 'warning',
          mesage :"No puede eliminar un profesional con recibos asignados",
          closeBtnName :"Acepto",
          mostrarIcono : true
        },
        keyboard : true,
        animated : true,
        backdrop : true
      };

      public static optModalAgregarPersonal(datosModal : Map<String, String> ,
                                 title : String , btnYes :string, btnNo : String ) : ModalOptions   {
         let s : ModalOptions = {
            initialState: {
                title: title,
                closeBtnName: btnYes,
                yesBtnName: btnNo,
                datosModal: { 
                  "Nombres": datosModal.get("nombres"),
                  "Apellidos":datosModal.get("apellidos"),
                  "Email":datosModal.get("email"),
                  "Patron de recibo" :"Sin definir"
                }
              },
              keyboard : true,
              animated : true,
              backdrop : true
        }
        return s;
      }
    
      public static optModalMostrarRecibos(fileItems :FileItem[] ,
        title : String , btnYes :string, btnNo : String , personalSeleccionado : Personal) : ModalOptions   {
            let params : ModalOptions = {
            initialState: {
              title: title,
              closeBtnName: btnYes,
              yesBtnName: btnNo,
              fileItems : fileItems,
              personalSeleccionado : personalSeleccionado
            },
            keyboard : true,
            animated : true,
            backdrop : true
            }
          return params;
          } 

    //para modal fijos , o modals con parametros agregarlos aca como constantes

}

