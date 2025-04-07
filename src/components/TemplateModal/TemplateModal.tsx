import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { ModalProps } from "../../utils/Types";
import { StyledModal } from "./TemplateModalStyles";
import { EditorPlugins, EditorToolbars } from "../../utils/Constants";
import { Button, Divider, Form, Input, Select, Space } from "antd";

const TemplateModal: React.FC<ModalProps> = ({
  open,
  handleOk,
  handleCancel,
}) => {
  const editorRef = useRef(null);

  const { Option } = Select;

  return (
    <StyledModal
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={window.innerWidth}
      height={window.innerHeight - 60}
      footer={null}
    >
      <div className="grid">
        <section className="left">
          <Form
            name="email-template"
            layout="vertical"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="Template Name"
              name="template-name"
              rules={[{ required: true }]}
            >
              <Input
                className="input"
                placeholder="Enter Template Name (for internal purpose)"
                style={{
                  width: "350px",
                }}
              />
            </Form.Item>
            <Form.Item className="business-input-group">
              <Space>
                <Form.Item
                  label="Business Offer / What are you selling?"
                  name="business-offer"
                >
                  <Input
                    className="input"
                    placeholder="Your Offer, Ex. SEO services for enterprises in USA"
                    style={{
                      width: "300px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={null}
                  name="language"
                  style={{
                    width: "200px",
                    marginTop: "30px",
                  }}
                >
                  <Select placeholder="Select Language" className="input">
                    <Option value="English">English</Option>
                    <Option value="Hindi">Hindi</Option>
                  </Select>
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              label="Subject Line"
              name="subject-line"
              rules={[{ required: true }]}
              style={{
                width: "700px",
              }}
            >
              <Input className="input" placeholder="Enter Subject Line" />
            </Form.Item>
            <Form.Item label="" name="email-body" rules={[{ required: true }]}>
              <Editor
                apiKey={import.meta.env.VITE_TinyMCE_API_KEY}
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: EditorPlugins,
                  toolbar: EditorToolbars,
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Form.Item>
          </Form>
          <div className="actions-wrapper">
            <Button className="btn-outline" size="large">
              Preview & Test
            </Button>
            <span>
              <Button className="btn-outline danger" size="large">
                Discard
              </Button>
              <Button type="primary" className="btn-primary" size="large">
                Save Email Template
              </Button>
            </span>
          </div>
        </section>
        <section className="right">
          <Divider
            type="vertical"
            style={{
              height: "100%",
            }}
          />
        </section>
      </div>
    </StyledModal>
  );
};

export default TemplateModal;
