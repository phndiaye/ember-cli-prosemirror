'use strict';

const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);

    this.import('node_modules/@fortawesome/fontawesome-free/css/all.min.css');
  },

  treeForPublic() {
    let publicTree = this._super.treeForPublic.apply(this, arguments);
    let trees = [];

    if (publicTree) {
      trees.push(publicTree);
    }

    trees.push(
      new Funnel('node_modules/@fortawesome/fontawesome-free/webfonts/', {
        srcDir: '/',
        destDir: 'webfonts'
      })
    );

    return mergeTrees(trees);
  }
};
