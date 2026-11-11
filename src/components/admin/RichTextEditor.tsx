import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'tinymce/tinymce';
import 'tinymce/icons/default/icons';
import 'tinymce/themes/silver/theme';
import 'tinymce/models/dom/model';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/image';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/wordcount';
import 'tinymce/skins/ui/oxide/skin.min.css';

// Import CSS as inline strings
// @ts-ignore
import contentCss from 'tinymce/skins/content/default/content.min.css?inline';
// @ts-ignore
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?inline';

export interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
}

const TinyEditor = Editor as any;

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  height = 480,
}) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-[#C9A5E8]/40 shadow-xs focus-within:border-[#6B18A8] focus-within:ring-2 focus-within:ring-[#6B18A8]/20 transition-all">
      <TinyEditor
        licenseKey="gpl"
        tinymceScriptSrc={[]}
        value={value}
        onEditorChange={onChange}
        init={{
          height,
          menubar: 'edit view insert format tools table',
          plugins:
            'advlist anchor autolink charmap code fullscreen image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | blockquote hr | removeformat | preview fullscreen code',
          toolbar_mode: 'sliding',
          skin: false,
          content_css: false,
          content_style: `${contentCss || ''}\n${contentUiCss || ''}\nbody{font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.75;color:#292333;padding:1.25rem}h1,h2,h3,h4{font-weight:800;color:#180828;margin-top:1.5rem;margin-bottom:0.75rem}img{max-width:100%;height:auto;border-radius:12px;margin:1rem 0}blockquote{border-left:4px solid #6B18A8;margin-left:0;padding-left:1.25rem;color:#4B0D78;font-style:italic}table{border-collapse:collapse;width:100%;margin:1rem 0}th,td{border:1px solid #C9A5E8;padding:8px 12px}`,
          branding: false,
          promotion: false,
          resize: true,
          link_default_target: '_blank',
          link_assume_external_targets: 'https',
        }}
      />
    </div>
  );
};

export default RichTextEditor;
