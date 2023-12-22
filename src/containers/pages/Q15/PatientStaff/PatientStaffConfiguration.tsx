
import React, { useState, Dispatch, useEffect, useRef } from "react";
import { Row, Col, Input, Label } from "reactstrap";

import "./patientStaff.css";
import { TabView, TabPanel } from 'primereact/tabview';


import {
    Datepicker,
    DatepickerEvent
} from "@meinefinsternis/react-horizontal-date-picker";


import { enUS } from "date-fns/locale";
import { enGB } from "date-fns/locale";
import { Button } from 'primereact/button';
import { HttpLogin } from "../../../../utils/Http";

// Correct type definition
interface IShift {
    duration: string
    startTime: string
    endTime: string
    shiftName: string
}




export const PatientStaffConfiguration: () => JSX.Element = () => {
    const [shiftIncharge, setShiftIncharge] = useState<IShift>()
    const [nurse, setNurse] = useState<any>()
    const [social, setSocial] = useState<any>()
    const [shiftName, setShiftName] = useState("SHIFT - A")
    const [activeIndex, setActiveIndex] = useState(0);
    const [rnIncharge, setrnIncharge] = useState<any>()


    const formatTime = (number) => {
        const hours = String(number).padStart(2, '0');
        const minutes = '00';
        return `${hours}:${minutes}`;
    };

    // date picker logic 

    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    function addDays(date: any, days: any) {
        date.setDate(date.getDate() + days);
        return date;
    }

    const [date, setDate] = React.useState<{
        endValue: Date | null;
        startValue: Date | null;
        // rangeDates: Date[] | null;
    }>({
        startValue: new Date(),
        endValue: addDays(new Date(), 15)
        // rangeDates: []
    });

    const handleChange = (d: DatepickerEvent) => {
        console.log(d[0]);
        const [startValue, endValue] = d;
        setDate((prev) => ({ ...prev, endValue, startValue }));
    };


    const getAllShiftapi = (() => {
        HttpLogin.axios().get("/api/org/getAll")
            .then((res) => {
                if (res.status == 200) {
                    let fileterOrg = res.data.data.find((x: any) => x.organizationdetails[0].name == 'MHC1')
                    const [hourOffset, minuteOffset] = fileterOrg?.shift?.startTime?.split(':').map(Number) as any;
                    fileterOrg.shift.startTime = hourOffset + minuteOffset
                    fileterOrg.shift.duration = Number(fileterOrg?.shift?.duration)
                    setShiftIncharge(fileterOrg.shift)
                    setSchedule([
                        {
                            id: 0,
                            time: `${formatTime(fileterOrg.shift.startTime)} - ${formatTime(fileterOrg.shift.startTime + 2)} `,
                            staff1: "",
                            staff2: "",
                            partial: false
                        },
                        {
                            id: 2,
                            time: `${formatTime(fileterOrg.shift.startTime + 2)} - ${formatTime(fileterOrg.shift.startTime + 4)} `,
                            staff1: "",
                            staff2: "",
                            partial: false
                        },
                        {
                            id: 3,
                            time: `${formatTime(fileterOrg.shift.startTime + 4)} - ${formatTime(fileterOrg.shift.startTime + 6)} `,
                            staff1: "",
                            staff2: "",
                            partial: false
                        },
                        {
                            id: 4,
                            time: `${formatTime(fileterOrg.shift.startTime + 6)} - ${formatTime(fileterOrg.shift.startTime + 8)} `,
                            staff1: "",
                            staff2: "",
                            partial: false
                        },
                    ])
                }
            })
    })


    useEffect(() => {
        getAllShiftapi()
    }, [])

    useEffect(() => {
        HttpLogin.axios().get("/api/staff/role/Registered Nurses")
            .then((res) => {
                console.log('i am response---Nurses', res)
                if (res.status == 200) {
                    setNurse(res.data.data)
                }
            })
    }, [])

    useEffect(() => {
        HttpLogin.axios().get("/api/staff/role/Social Worker")
            .then((res) => {
                console.log('i am response---Social', res)
                if (res.status == 200) {
                    setSocial(res.data.data)
                }
            })
    }, [])


    const handleSubmit = () => {
        let payload = {
            date: date.startValue.toDateString(),
            shift: [{
                shiftName: activeIndex == 0 ? 'Shift - A' : activeIndex == 1 ? 'Shift - B' : 'Shift - C',
                rnIncharge: rnIncharge,
                startTime: formatTime(shiftIncharge.startTime),
                endTime: formatTime(shiftIncharge?.startTime + shiftIncharge?.duration),
            }],
            schedule: [],
            createdAt: "",
            updatedAt: ""
        }
        // Use map to remove the specified key from each object
        payload.schedule = schedule.map(obj => {
            const { ['id']: removedKey, ['partial']: remove, ...rest } = obj;
            return rest;
        });
        console.log('i am click---', payload)

        HttpLogin.axios().post("/api/PSConfig/register", payload)
            .then((res) => {
                console.log('i am response---Social', res)
                if (res.status == 200) {
                }
            })
    }


    useEffect(() => {
    }, [ref, mounted]);



    const [schedule, setSchedule] = useState<any>([])

    // Function to handle changes in item properties
    const handleItemChange = (itemId, propertyName, value) => {
        setSchedule((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, [propertyName]: value } : item
            )
        );
    };


    const loadIncharge = () => {
        return (
            <div>
                <Row className="tab-align" >
                    <Col md="4" sm="1" xs="4">
                        <Input readOnly placeholder="Start Time" value={formatTime(shiftIncharge?.startTime)} className="p-inputtext-lg" />

                    </Col>
                    <Col md="4" sm="1" xs="4">
                        <Input readOnly placeholder="End Time" value={shiftIncharge?.startTime + shiftIncharge?.duration + ':00'} className="p-inputtext-lg" />
                    </Col>
                    <Col md="4" sm="1" xs="4">
                        <Input
                            id="exampleSelectMulti"
                            name="Shift Incharge"
                            type="select"
                            onChange={(e) => setrnIncharge(e.target.value)}
                        >
                            <option value="">Select Shift Incharge</option>
                            {nurse?.map((option) => (
                                <option key={option.id} value={`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}>
                                    {`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}
                                </option>
                            ))}
                        </Input>
                    </Col>
                </Row>
                <h4 className="q15-title">Slots</h4>
            </div>
        )


    }

    const loadShift = () => {
        return (
            <div>
                {schedule.map((item: any) => (

                    <Row key={item.id}>
                        <div className="card-bg">
                            <Row className="tab-align">
                                <Col md="3" sm="1" xs="3">
                                    <Input className="p-inputtext-lg" readOnly value={item?.time} onChange={(e) => handleItemChange(item.id, 'time', e.target.value)} />

                                </Col>
                                <Col md="3" sm="1" xs="3">
                                    <Input
                                        id="exampleSelectMulti"
                                        name="Social Worker"
                                        type="select"
                                        onChange={(e) => handleItemChange(item.id, 'staff1', e.target.value)}
                                    >
                                        <option value="">Social Worker</option>
                                        {social?.map((option) => (
                                            <option key={option.id} value={`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}>
                                                {`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}
                                            </option>
                                        ))}
                                    </Input>
                                </Col>
                                <Col md="6" sm="1" xs="6">
                                    <Row>
                                        <Col md="3" sm="1" xs="3">
                                            <Input
                                                id="id"
                                                type="checkbox"
                                                value={item.partial}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleItemChange(item.id, 'partial', e.target.checked)}
                                            />
                                            <Label check>
                                                &nbsp;  Partial
                                            </Label>
                                        </Col>
                                        <Col md="6" sm="1" xs="6">
                                            {item.partial &&
                                                <Input
                                                    id="exampleSelectMulti"
                                                    name="Social Worker"
                                                    type="select"
                                                    onChange={(e) => handleItemChange(item.id, 'staff2', e.target.value)}
                                                >
                                                    <option value="">Social Worker</option>
                                                    {social?.map((option) => (
                                                        <option key={option.id} value={`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}>
                                                            {`${option.name[0].given} ${option.name[0].use} ${option.name[0].family}`}
                                                        </option>
                                                    ))}
                                                </Input>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Row>
                ))}
            </div>
        )
    }

    const handleTabChange = (event) => {
        // Handle the tab change event here
        console.log('Tab changed:', event.index);
        setActiveIndex(event.index)
    };

    return (
        <div className="staff">
            <div className="container">
                <div className=" patient">
                    <div className="">
                        <div className="q15-title ">
                            Q15 Patient Staff Configuration
                        </div>
                    </div>
                </div>
                <div className="date-aligin">
                    <Datepicker
                        ref={ref}
                        onChange={handleChange}
                        locale={enGB}
                        startValue={date.startValue}
                        endValue={null}
                        classNames={{ dayLabel: "hello" }}
                    />
                </div>
                <h4 className="q15-title">Shift incharge</h4>
                <div className="card">
                    <div className="">
                        <TabView activeIndex={activeIndex} onTabChange={handleTabChange}>
                            <TabPanel header="SHIFT - A" key="tab1" >
                                <div className="container">
                                    {loadIncharge()}
                                    {loadShift()}
                                </div>
                            </TabPanel>
                            <TabPanel header="SHIFT - B" key="tab2" closable>
                                {loadIncharge()}
                                {loadShift()}
                            </TabPanel>
                            <TabPanel header="SHIFT - C" key="tab3" closable>
                                {loadIncharge()}
                                {loadShift()}
                            </TabPanel>
                        </TabView>
                        <div className="submit-section">
                            <Button className="patient-submit" onClick={handleSubmit} label="Submit" text raised />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

