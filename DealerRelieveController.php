<?php
/**
 *
 */
class DealerRelieveController extends DmsBaseController{
    
    public $base_url;
    public $model;
    
    public function init(){
        parent::init();
        $this->base_url=$_SERVER['SERVER_NAME'].$_SERVER['DOCUMENT_URI'];
    }
    
    public function actionIndex(){
        $model = new DmsDealerMember();
        $model->unsetAttributes();
        if($_GET['search_type']){
            $parameter['did'] = $_GET['telDid'];
            $type['search_type'] = $_GET['search_type'];
        }else
            $parameter['tel'] = $_GET['telDid'];
        
        if($_GET['binding']==0)           
            $parameter['status'] = 0;           
        else if ($_GET['binding']==2)
            $parameter['status'] = 1;
        $model->attributes = $parameter;
        $model = $model->MamberSearch();
        $type['binding'] = $_GET['binding'];
        $type['telDid'] = $_GET['telDid'];
        $this->render('index',array('model'=>$model,'type'=>$type));   
    }
    
    
    //gcar_dealer_member 
    public function actionReset(){
        $model = new DmsDealerMember();
        $tel = $_GET['tel'];
        $res = $model->unbundle($tel);
        echo $res;
    }
}
