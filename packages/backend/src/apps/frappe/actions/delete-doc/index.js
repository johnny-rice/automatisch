import defineAction from '../../../../helpers/define-action.js';

export default defineAction({
  name: 'Delete Document',
  key: 'deleteDoc',
  description: 'Deletes a document from Frappe.',
  arguments: [
    {
      label: 'Document Type',
      key: 'doctype',
      type: 'dropdown',
      required: true,
      variables: true,
      source: {
        type: 'query',
        name: 'getDynamicData',
        arguments: [
          {
            name: 'key',
            value: 'listDoctypes',
          },
        ],
      },
    },
    {
      label: 'Document Name',
      key: 'documentName',
      type: 'string',
      required: true,
      description: 'The name of the document to delete.',
      variables: true,
    },
  ],

  async run($) {
    const doctype = $.step.parameters.doctype;
    const documentName = $.step.parameters.documentName;
    const response = await $.http.delete(
      `/v2/document/${doctype}/${documentName}`
    );

    $.setActionItem({ raw: response.data });
  },
});
