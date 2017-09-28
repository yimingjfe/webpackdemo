function HelloWorldPlugin(options){

}

HelloWorldPlugin.prototype.apply = (compiler) => {
  console.log(compiler)
  compiler.plugin('emit', (compilation, callback) => {
    console.log('compilation', compilation);
    var filelist = 'In this build:\n\n';
    for (var filename in compilation.assets) {
      filelist += ('- '+ filename +'\n');
    }

    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };

    callback();
  })
}

module.exports = HelloWorldPlugin