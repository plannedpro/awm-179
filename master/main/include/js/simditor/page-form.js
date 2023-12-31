(function() {
    $(function() {
        var editor;
        editor = new Simditor({
            textarea: $('#txt-content1'),
            placeholder: '...',
            pasteImage: true,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'],
            defaultImage: 'assets/images/image.png',
            upload: location.search === '?upload' ? {
                url: '/upload'
            } : false
        });
        return editor = new Simditor({
            textarea: $('#txt-content2'),
            placeholder: '...',
            pasteImage: true,
            toolbar: ['title', 'bold', 'italic', 'underline', 'strikethrough', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent'],
            defaultImage: 'assets/images/image.png',
            upload: location.search === '?upload' ? {
                url: '/upload'
            } : false
        });
    });

}).call(this);