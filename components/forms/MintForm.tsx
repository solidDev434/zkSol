"use client";

import useMintForm from '@/hooks/useMintForm'
import React from 'react'
import { Input } from '../ui/Input';
import FilepondUploader from '../FilepondUploader';
import { Button } from '../ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { X } from 'lucide-react';

const MintForm = () => {
    const {
        formik,
        errors,
        isValid,
        isLoading,
        handleImageURL,
        addAttribute,
        updateAttribute,
        removeAttribute
    } = useMintForm();
    const { connected } = useWallet();

  return (
    <form 
        onSubmit={formik.handleSubmit}
        className="grid gap-2.5"
    >
        <Input 
            type="text"
            name="tkName"
            placeholder="Token Name"
            value={formik.values.tkName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={errors.tkName.message}
            aria-invalid={errors.tkName.isInvalid}
        />

        <Input 
            type="text"
            name="tkSymbol"
            placeholder="Token Symbol"
            value={formik.values.tkSymbol}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={errors.tkSymbol.message}
            aria-invalid={errors.tkSymbol.isInvalid}
        />

        <Input 
            type="text"
            name="tkSupply"
            placeholder="Token Supply"
            value={formik.values.tkSupply}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={errors.tkSupply.message}
            aria-invalid={errors.tkSupply.isInvalid}
        />

        <Input 
            type="text"
            name="decimals"
            placeholder="Token decimals"
            value={formik.values.decimals}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={errors.decimals.message}
            aria-invalid={errors.decimals.isInvalid}
        />

        <FilepondUploader 
            label=""
            setImage={source => handleImageURL(source)}
        />

        <div className="w-full space-y-3">
            <header className="flex items-center justify-between">
                <h5>Additional Attributes</h5>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={addAttribute}
                >
                    Add field
                </Button>
            </header>

            <div className="space-y-1.5">
                {formik.values.attributes?.map((attr, index) => (
                    <div 
                        key={index}
                        className="grid grid-cols-[repeat(2,1fr)_max-content] items-center gap-2.5"
                    >
                        <Input 
                            type="text"
                            name={`attributes[${index}].key`}
                            placeholder="key"
                            value={attr.key}
                            onChange={e => updateAttribute(index, "key", e.target.value)}
                            onBlur={formik.handleBlur}
                        />
                        
                        <Input
                            type="text"
                            placeholder="Value"
                            value={attr.value}
                            onChange={e => updateAttribute(index, "value", e.target.value)}
                            onBlur={formik.handleBlur}
                            name={`attributes[${index}].value`}
                        />
                        <span 
                            onClick={() => removeAttribute(index)}
                            className="bg-white rounded-full p-0.5"
                        >
                            <X className="text-red-500 size-6" />
                        </span>
                    </div>
                ))}
            </div>
        </div>

        <Button
            type="submit"
            disabled={/*isValid ||*/ !connected}
            isLoading={isLoading}
            className="mt-3"
        >
            {connected ? "Mint Tokens" : "Connect wallet"}
        </Button>
    </form>
  )
}

export default MintForm