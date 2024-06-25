import React, { useEffect, useState } from 'react';
import './progressbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Progressbar = ({ ...statusObj }) => {
  const [currentStep, setCurrentStep] = useState();

  useEffect(() => {
    if (statusObj.overallStatus === 'submitted' && statusObj.approverStatus !== 'approved') {
      setCurrentStep(1);
    } else if (statusObj.overallStatus === 'submitted' && statusObj.approverStatus === 'approved') {
      setCurrentStep(2);
    } else if (statusObj.overallStatus === 'approved') {
      setCurrentStep(3);
    }
  }, [statusObj]);

  const steps = [
    {
      label: 'Submitted',
      completed: currentStep >= 1,
      latest: currentStep === 1
    },
    {
      label: 'Partially Approved',
      completed: currentStep >= 2,
      latest: currentStep === 2
    },
    {
      label: 'Approved',
      completed: currentStep >= 3,
      latest: currentStep === 3
    },
  ];

  if (statusObj.overallStatus === 'rejected') {
    return (
      <div className="rejected-status">
        <FontAwesomeIcon icon={faCircleXmark} beat style={{ color: "#e1430e", fontSize: '40px' }} />
        <div style={{ color: "#e1430e", fontSize: '18px', marginTop: '5px' }}>Rejected</div>
      </div>
    );
  }

  return (
    <div>
      <div className="progress-indicator">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${step.completed ? 'completed' : ''} ${step.latest ? 'latest' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progressbar;
