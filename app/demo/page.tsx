'use client';

import { useEffect, useState } from 'react';
import supabase from '../../client'; // Ensure Supabase client is imported
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import '../globals.css';
interface BankDetails {
  BANK: string;
  BRANCH: string;
  IFSC: string;
  // Add other fields from the bank API as needed
}

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idType: 'None',
    idNumber: '',
    bankName: '',
    bankAccountNumber: '',
    ifscCode: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [session, setSession] = useState(null);
  const steps = [
    { number: 1, name: 'Personal' },
    { number: 2, name: 'ID' },
    { number: 3, name: 'Bank Details' },
    { number: 4, name: 'Password' },
  ];

  // Check for existing session on component load
  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // setSession(session);
    };
    fetchSession();
  }, []);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.idType !== 'None' && formData.idNumber;
      case 3:
        return formData.bankName && formData.bankAccountNumber && formData.ifscCode;
      case 4:
        return formData.password;
      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (validateStep()) {
      if (step === steps.length) {
        await fetchBankDetails();
      } else {
        setStep(prev => prev + 1);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const fetchBankDetails = async () => {
    try {
      const response = await fetch(`https://bank-apis.justinclicks.com/API/V1/IFSC/${formData.ifscCode.toUpperCase()}`);
      if (response.ok) {
        const data = await response.json();
        setBankDetails(data);
        setIsConfirming(true);
      } else {
        alert('Invalid IFSC code or unable to retrieve bank details.');
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  const confirmDetails = async () => {
    const { name, email, bankAccountNumber, ifscCode, idType, idNumber, password } = formData;
    console.log('Submitting data:', formData);
    const dob = new Date().toISOString();
  
    // Step 1: Sign up the user with email and password (Supabase Auth)
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (authError) {
      console.error('Error during signup:', authError.message);
      return;
    }
  
    if (!user) {
      console.error('User is null after signup');
      return;
    }
  
    console.log('User signed up successfully:', user);
  
    // Step 2: Insert data into users table using the user_id from auth
    const { error: userError } = await supabase.from('users').insert({
      user_id: user.id,  // Use the generated ID from the auth system
      full_name: name,
      email,
      bank_acc_no: bankAccountNumber,
      aadhar_no: idType === 'Aadhar' ? idNumber : null,
      pan_no: idType === 'PAN' ? idNumber : null,
      dob,
    });
  
    if (userError) {
      console.error('Error inserting to users table:', userError.message);
      return;
    }
    console.log('Inserted into users table successfully');
  
    // Step 3: Insert data into signup_check table (if needed)
    const { error: signupError } = await supabase.from('signup_check').insert({
      bank_acc_no: bankAccountNumber,
      fullname: name,
      aadhar_no: idType === 'Aadhar' ? idNumber : null,
      pan_no: idType === 'PAN' ? idNumber : null,
      email,
      registered: true,
    });
  
    if (signupError) {
      console.error('Error inserting to signup_check table:', signupError.message);
      return;
    }
    console.log('Inserted into signup_check table successfully');
  
    // Step 4: Insert data into bank_details table (if needed)
    const { error: bankError } = await supabase.from('bank_details').insert({
      ifsc_code: ifscCode,
      bank_name: bankDetails?.BANK || '',
      bank_branch: bankDetails?.BRANCH || '',
    });
  
    if (bankError) {
      console.error('Error inserting to bank_details table:', bankError.message);
      return;
    }
    console.log('Inserted into bank_details table successfully');
  
    // Data inserted successfully
    setIsConfirming(false);
    console.log('Data submitted successfully!');
  };
  
  

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name">What's your name? <span className="text-red-500">*</span></Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="UserName" required />
            <Label htmlFor="email">What's your email? <span className="text-red-500">*</span></Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="idType">Select ID Type <span className="text-red-500">*</span></Label>
            <select id="idType" name="idType" value={formData.idType} onChange={handleInputChange} className="w-full border-gray-300 rounded-md p-2">
              <option value="None" disabled>Select ID Type</option>
              <option value="PAN">PAN Card</option>
              <option value="Aadhar">Aadhar Card</option>
            </select>
            {formData.idType !== 'None' && (
              <>
                <Label htmlFor="idNumber">Enter your {formData.idType === 'PAN' ? 'PAN' : 'Aadhar'} Number <span className="text-red-500">*</span></Label>
                <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleInputChange} placeholder={formData.idType === 'PAN' ? 'Enter PAN number' : 'Enter Aadhar number'} required />
              </>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="bankName">Bank Name <span className="text-red-500">*</span></Label>
            <select id="bankName" name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full border-gray-300 rounded-md p-2" required>
              <option value="" disabled>Select Bank</option>
              <option value="SBI">State Bank of India</option>
            </select>
            <Label htmlFor="bankAccountNumber">Bank Account Number <span className="text-red-500">*</span></Label>
            <Input id="bankAccountNumber" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleInputChange} placeholder="e.g., 1234567890" required />
            <Label htmlFor="ifscCode">IFSC Code <span className="text-red-500">*</span></Label>
            <Input id="ifscCode" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange} placeholder="e.g., SBIN0001234" required />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label htmlFor="password">Set a Password <span className="text-red-500">*</span></Label>
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange} placeholder="Create a strong password" required />
            <button type="button" onClick={togglePasswordVisibility} className="inline-flex items-center text-gray-500">
              {showPassword ? <EyeOff /> : <Eye />} {showPassword ? 'Hide' : 'Show'} Password
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-8">
      <h2 className="text-xl font-semibold">Signup Process</h2>
      <div>
        <div className="flex justify-between items-center">
          {steps.map((s) => (
            <div key={s.number} className={`text-center ${s.number <= step ? 'text-blue-500' : 'text-gray-400'}`}>
              <p>{s.name}</p>
              {s.number < steps.length && <ChevronRight className="mx-2" />}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={e => e.preventDefault()}>
        {renderStep()}
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <Button onClick={() => setStep(prev => prev - 1)}><ChevronLeft /> Back</Button>
          )}
          <Button onClick={nextStep}  className="ml-auto">
            {step < steps.length ? 'Next' : 'Confirm'}
            {step === steps.length && <Check className="ml-2" />}
          </Button>
        </div>
      </form>

      {isConfirming && bankDetails && (
        <div className="bg-gray-100 p-4 rounded-md mt-8">
          <h3 className="text-lg font-semibold mb-2">Confirm Bank Details</h3>
          <p><strong>Bank:</strong> {bankDetails.BANK}</p>
          <p><strong>Branch:</strong> {bankDetails.BRANCH}</p>
          <p><strong>IFSC:</strong> {bankDetails.IFSC}</p>
          {/* Add more bank details as needed */}
          <Button onClick={confirmDetails} className="mt-4">Confirm and Submit</Button>
        </div>
      )}
    </div>
  );
}
