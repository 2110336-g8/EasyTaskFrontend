import React from 'react';



const LayoutBox: React.FC = () => {
  return (
    <div>
        <div className="layout-box bg-primary-100 font-sans w-[1200px] h-[400px] rounded-lg mb-[50px] p-[50px]">
        <div className="left-side w-[400px] h-full mr-[50px]">
            <div className="description text-slate-500 font-h4 text-h4 tracking-h4 mb-[10px]">For Client</div>
            <div className="header text-slate-900  font-bold text-[64px] leading-[64px] tracking-[-0.01em] mb-[10px]">Find talent & get jobs done</div>
            <button className="button bg-primary-500 font-h3 text-h3 tracking-h3 w-full h-[50px]">Create your job ads</button>
        </div>
        <div className="right-side w-[800px] flex items-center">
            <img src="/banner1.png" alt="Image" className="image object-cover h-full w-full" />
        </div>
        <style jsx>{`
            .layout-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: px solid #ccc;
            }
            .button {
            color: #fff;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 7px
            }
            .button:hover {
            opacity: 0.8;
            }
            .image {
            max-width: 100%;
            height: auto;
            }
        `}</style>
        </div>
        <div className="layout-box bg-primary-100 font-sans w-[1200px] h-[400px] rounded-lg p-[50px]">
            <div className="right-side w-[800px] mr-[50px] flex items-center">
                <img src="/banner2.png" alt="Image" className="image" />
            </div>
            <style jsx>{`
                .layout-box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border: px solid #ccc;
                }
                .button {
                color: #fff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                margin-top: 7px
                }
                .button:hover {
                opacity: 0.8;
                }
                .image {
                max-width: 100%;
                height: auto;
                }
            `}</style>
            <div className="left-side w-[400px] h-full">
                <div className="description text-slate-500 font-h4 text-h4 tracking-h4 mb-[10px]">For Talent</div>
                <div className="header text-slate-900  font-bold text-[64px] leading-[64px] tracking-[-0.01em] mb-[10px]">Explore great work to earn</div>
                <button className="button bg-primary-500 font-h3 text-h3 tracking-h3 w-full h-[50px]">Apply Your Dream Job</button>
            </div>
        </div>
        
    </div>
    
  );
};

export default LayoutBox;
