import {
  Alert,
  Checkbox,
  CheckboxProps,
  DatePicker,
  Divider,
  Form,
  FormProps,
  Input,
  Select,
  Space,
  TimePicker,
  Tooltip,
} from "antd";
import { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { saveNodes, saveSchedule } from "../../services/allServices";
import { RootState } from "../../store";
import { ModalProps } from "../../utils/Types";
import { StyledModal } from "./SaveModalStyles";
import { toggleSaveModal } from "../../reducers/mainSlice";

const { Option } = Select;

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type FieldType = {
  time: Date;
};

export interface DataType {
  time: Date;
  body: string;
  subject: string;
  email: string;
}

const config = {
  rules: [
    {
      type: "object" as const,
      message: "Please select time!",
    },
  ],
};

const SaveModal: React.FC<ModalProps> = ({
  open,
  handleCancel,
  openNotification,
}) => {
  const [randomCheckbox, setRandomCheckbox] = useState(true);
  const { nodes } = useSelector((state: RootState) => state.nodes);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const leadNodes = nodes.filter((node) => node.type === "lead");
      const emailNodes = nodes.filter((node) => node.type === "email");

      if (leadNodes.length === 0) {
        if (openNotification)
          openNotification("error", "Add at least one Lead List", "");
        return;
      }

      if (emailNodes.length === 0) {
        if (openNotification)
          openNotification("error", "Add at least one Email Template", "");
        return;
      }

      const leadNodeArr = leadNodes.reduce((leads, node) => {
        leads = [...leads, ...(node.data.emails as Array<string>)];

        return leads;
      }, [] as string[]);

      const emailNode = nodes.find((node) => node.type === "email")?.data;

      const combinedEmails = leadNodeArr.join(", ");

      const dataToSend: DataType = {
        time: values.time,
        body: (
          emailNode?.value as {
            body: string;
          }
        )?.body,
        subject: (
          emailNode?.value as {
            subject: string;
          }
        )?.subject,
        email: combinedEmails,
      };

      await saveNodes(nodes);
      await saveSchedule(dataToSend);

      setTimeout(() => {
        dispatch(toggleSaveModal());
      }, 500);

      if (openNotification)
        openNotification("success", "Success", "Schedule Saved Successfully!");
    } catch (err) {
      console.log(err);
      if (openNotification)
        openNotification("error", "Error", "Failed to save schedule!");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onSave = () => {
    form.submit();
  };

  const onRandomCheckboxChange: CheckboxProps["onChange"] = (e) => {
    const value = e.target.checked;
    setRandomCheckbox(value);
  };

  return (
    <StyledModal
      title="Sequence Settings"
      open={open}
      onOk={onSave}
      onCancel={handleCancel}
      width={800}
      okText={"Save"}
      randomCheckbox={randomCheckbox}
    >
      <Divider />

      <Form
        form={form}
        name="configure"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        // disabled={true}
      >
        <Form.Item>
          <Space size={"middle"}>
            <Form.Item
              name="date"
              label="Launch on - Date"
              rules={[
                {
                  type: "object" as const,
                  message: "Please select time!",
                },
              ]}
            >
              <DatePicker
                style={{
                  width: "250px",
                  height: "40px",
                }}
              />
            </Form.Item>
            <Form.Item
              name="time"
              label="TimePicker"
              rules={[
                {
                  type: "object" as const,
                  required: true,
                  message: "Please select time!",
                },
              ]}
            >
              <TimePicker
                style={{
                  width: "200px",
                  height: "40px",
                }}
                use12Hours
                format="h:mm A"
              />
            </Form.Item>
            <Form.Item name="timezone" label="Timezone">
              <Select
                placeholder="Select a option and change input text above"
                onChange={() => {}}
                allowClear
                style={{
                  width: "200px",
                  height: "40px",
                }}
              >
                <Option value="asia/calcutta">Asia/Calcutta</Option>
              </Select>
            </Form.Item>
          </Space>
          <Space
            style={{
              marginBottom: "10px",
            }}
          >
            <Checkbox
              onChange={onRandomCheckboxChange}
              checked={randomCheckbox}
            >
              Add Random Delays
            </Checkbox>
            <Tooltip
              className="tooltip"
              title={
                "Add random delays between emails that are sent from this email address fro risk-free email deliverability."
              }
            >
              <BsQuestionCircle />
            </Tooltip>
          </Space>
          {randomCheckbox ? (
            <Form.Item
              style={{
                marginBottom: "10px",
                paddingBottom: 0,
              }}
            >
              <Space>
                <Form.Item
                  label="FROM (minutes)"
                  name={"from"}
                  initialValue={"10"}
                >
                  <Input
                    placeholder="input placeholder"
                    type="number"
                    min={1}
                    style={{
                      width: "350px",
                      height: "40px",
                    }}
                  />
                </Form.Item>
                <Form.Item label="TO (minutes)" name={"to"} initialValue={"20"}>
                  <Input
                    placeholder="input placeholder"
                    type="number"
                    min={1}
                    style={{
                      width: "350px",
                      height: "40px",
                    }}
                  />
                </Form.Item>
              </Space>
            </Form.Item>
          ) : (
            <Alert
              message="We add 30-60 second delay between emails sent from same email address to add human touch & enhance deliverability."
              type="info"
              showIcon
              style={{
                width: "750px",
              }}
            />
          )}
          <h3>
            Configure Sending Hours & Days
            <Tooltip
              className="tooltip"
              title={
                "Add random delays between emails that are sent from this email address for risk-free email deliverability."
              }
            >
              <BsQuestionCircle />
            </Tooltip>
          </h3>
          <div className="week-table">
            <div className="tr">
              <span className="td">Enabled</span>
              <span className="td">Day</span>
              <span className="td">From</span>
              <span className="td">Till</span>
              {randomCheckbox && (
                <span className="td">
                  Emails Sends / Day / Sender
                  <Tooltip
                    className="tooltip"
                    title={
                      "Add random delays between emails that are sent from this email address for risk-free email deliverability."
                    }
                  >
                    <BsQuestionCircle />
                  </Tooltip>
                </span>
              )}
            </div>

            {days.map((day) => (
              <Form.Item key={day}>
                <div className="tr">
                  <Form.Item
                    name={["config", day, "enabled"]}
                    className="td"
                    valuePropName="checked"
                    label={null}
                  >
                    <Checkbox />
                  </Form.Item>
                  <Form.Item className="td">{day}</Form.Item>
                  <Form.Item name={["config", day, "from"]} className="td">
                    <TimePicker use12Hours format="h:mm A" {...config} />
                  </Form.Item>
                  <Form.Item name={["config", day, "till"]} className="td">
                    <TimePicker use12Hours format="h:mm A" {...config} />
                  </Form.Item>
                  {randomCheckbox && (
                    <Form.Item
                      name={["config", day, "days"]}
                      className="td"
                      initialValue={"24-48"}
                    >
                      <Input disabled />
                    </Form.Item>
                  )}
                </div>
              </Form.Item>
            ))}
          </div>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default SaveModal;
