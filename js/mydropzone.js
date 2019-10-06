Dropzone.options.dropzoneFrom = {
    url:"/upload",
    autoProcessQueue: false,
    acceptedFiles:".png,.jpg,.gif,.bmp,.jpeg",
    init: function(){

        var submitButton = document.querySelector('#submit-all');
        myDropZone = this;                
        console.log(myDropZone);
        $(document).on("click",".editbutton",function(e){
            console.log(e.target.id);
            
            addEditHtmls(myDropZone,null,e);

        });
        submitButton.addEventListener("click", function(){
            
            var count= myDropZone.files.length;
            console.log(count);
            if(count>0){
                myDropZone.processQueue();
            }else{
                Swal.fire({
                    title: 'FAIL',
                    html: '사진을 추가해주세요.',
                    type: 'error',
                    confirmButtonText: 'OK'
                })	
            }
            
        });
        this.on("addedfile", function(file){
            console.log("---------------");
            if(fileMap.get(file.name)==null){
                fileMap.set(file.name,file);
                for (var _iterator6 = file.previewElement.querySelectorAll("[data-edmit-button]"), _isArray6 = true, _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                    var _ref5;
    
                    if (_isArray6) {
                        if (_i6 >= _iterator6.length) break;
                        _ref5 = _iterator6[_i6++];
                    } else {
                        _i6 = _iterator6.next();
                        if (_i6.done) break;
                        _ref5 = _i6.value;
                    }
    
                    var buttonElement = _ref5;
                    
                    buttonElement.id = file.name;
    
                    }
                
               addEditHtmls(myDropZone,file);
               console.log(file);
            }else{
                myDropZone.removeFile(file);
                Swal.fire({
                    title: 'FAIL',
                    html: '같은 이름의 파일이 이미 추가되어있습니다.',
                    type: 'error',
                    confirmButtonText: 'OK'
                })
            }

        });
        this.on("sending", function(file, xhr, formData){
            formData.append("filename", file.name);
            formData.append("write_content", $("#autosize").val);
            formData.append("rmvFileArr", rmvFileArr);
        });
            
    },
    transformFile: function(file, done) {

        done(canvasArr[index]);
        index++;
        console.log(file);
        console.log(index);
    },
     previewTemplate: document.querySelector('#preview').innerHTML
};